<script>
    import {db} from "../firebase.js"
    import UploadFiles from "./UploadFiles.svelte"
    const projects = db.collection("projects")
    export let getCountryData
    export let getCategoryData

    let name
    let description
    let location
    let startDate
    let endDate
    let category

    const registerProject = () => {
        projects.add({
            name, description, location, startDate, endDate, category, received: 0, spent: 0
        })
        name = ""
        description = ""
        location = ""
        startDate = ""
        endDate = ""
        category = ""
    }
</script>

<form on:submit|preventDefault={registerProject}>
    <div class="beside">
        <label for="name">Name</label>
        <input type="text" class="border-dotted" id="name" bind:value={name} required>
    </div>

    <div class="beside">
        <label for="description">Description</label>
        <input type="text" class="border-dotted" id="description" bind:value={description} required>
    </div>

    <UploadFiles />

    <div class="grid-container">
        <div class="beneath">
            <label for="location">Location</label>
            <select class="dark-background" id="location" bind:value={location} required>
                <option>[choose location]</option>
                {#await getCountryData then countries}
                    {#each countries as country}
                        <option value={country.data().name}>{country.data().name}</option>
                    {/each}
                {/await}
            </select>
        </div>
        <div class="beneath date">
            <label for="start-date">Start Date</label>
            <input class="dark-background" id="start-date" type="date" bind:value={startDate} required>
        </div>
        <div class="beneath">   
            <label for="category">Category</label>
            <select class="dark-background" id="category" bind:value={category} required>
                <option>[choose country]</option>
                {#await getCategoryData then categories}
                    {#each categories as category}
                        <option value={category.data().name}>{category.data().name}</option>
                    {/each}
                {/await}
            </select>
        </div>
        <div class="beneath date">
            <label for="end-date">End Date</label>
            <input class="dark-background" id="end-date" type="date" bind:value={endDate} required>
        </div>
    </div>
    <button class="btn-register">Register Project</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        gap: 15px 30px;
    }

    label {
        min-width: 95px;
    }

    input[type="date"] {
        min-width: 130px;
    }

    input,
    select,
    .btn-register {
        outline: none;
        border: none;
    }

    input,
    select {
        color: #47525E;
        background-color: transparent;
        margin-bottom: 25px;
        font-size: 2rem;
    }

    input[type="text"] {
        width: 60%;
    }

    select {
        width: 100%;
        max-width: 700px;
    }

    .date {
        max-width: 65%;
    }

    .btn-register {
        background-color: darkgreen;
        color: white;
        width: 55%;
        margin: 45px auto 0 auto;
        padding: 10px 17px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 1.8rem;
    }

    .btn-register:active{
        background-color: #47525E;
    }

    .beneath {
        display: flex;
        flex-direction: column;
    }

    .beside {
	    display: flex;
	    margin-bottom: 10px;
	    align-items: baseline;
	    width: 100%;
    }

    .dark-background {
	    background-color: #47525E;
	    color: white;
    }
</style>