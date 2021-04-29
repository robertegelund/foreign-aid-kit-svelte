<script>
    import {storage} from "../firebase.js"

    let current = ""
    let url = ""
    let files = []
    $: file = files[0]
    
    const uploadFiles = async () => {
        const path = storage
            .ref()
            .child("projectDocumentation/" + file.name)
        
        const upload = await path.put(file)
        const urlen = await upload.ref.getDownloadURL();
        url = urlen
        current = "active"
    }

</script>

<label for="documentation">Upload Documentation</label>
<div>
    <input class="dark-background" id="documentation" type="file" bind:files>
    {#if file}
        <button 
            class={current === "active" ? "active" : ""} 
            on:click|preventDefault={uploadFiles}>Upload
        </button>
    {:else}
        <p class="upload-status">Push the grey field to choose a file</p>
    {/if}
    {#if url}
        <p class="upload-status">Successfully uploaded!</p>
    {/if}
</div>

<style>
    div {
        margin-bottom: 25px;
    }

    input,
    button {
        border-radius: 5px;
    }

    input {
        background-color: #47525E;
        color: white;
        padding: 2px;
        text-indent: -999px;
        outline: none;
        font-size: 2rem;
        width: 70%;
        max-width: 300px;
    }

    button {
        background-color: darkgreen;
        color: white;
        width: 10%;
        margin: 10px auto 0 auto;
        padding: 5px 5px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 1.8rem;
        outline: none;
    }
    

    .upload-status {
        font-size: 2rem;
        padding: 2px;
        color: darkgreen
    }

    .active {
        display: none;
    }
</style>