console.log("Content Script Loaded. Attaching listener.");

document.addEventListener("keydown", async (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (!target) return; 

    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {

        if (e.key === "ArrowUp") {
            const inputElement = target as HTMLInputElement | HTMLTextAreaElement;
            const text = inputElement.value.trim();

            if (text.length > 0) {
                const output = await new Promise<any>((resolve, reject) => {
                    chrome.runtime.sendMessage(
                        { type: "input_change", prompt: text },
                        (response) => {
                            if (chrome.runtime.lastError) {
                                reject(chrome.runtime.lastError); 
                            } else {
                                resolve(response);
                            }
                        }
                    );
                });
                console.log(output);
                // console.log("Heyuadiuaeg");
                inputElement.value = `${text} ${output.suggestion1}`;
            }
        }
    }
});
