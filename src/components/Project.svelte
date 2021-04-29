<script>
    export let getCountryData
    export let getCategoryData
    export let projectID
    export let projectData
    import {db} from "../firebase.js"
    const projects = db.collection("projects")

    let show = false
    let change = true

    const showProjectInfo = () => {
        show = !show
    }

    const toggleChangeMode = () => {
        change = !change
    }

    const changeProjectInfo = (id) => {
        projects.doc(id).update({
            category: projectData.category,
            location: projectData.location,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            description: projectData.description
        })
    }

    const removeProject = (id) => {
        projects.doc(id).delete()
    }

   
</script>

<div class="border-dotted">
    <div class="project-full">
        <div class="icons">
            <h2>{projectData.name}</h2>
            <i on:click={showProjectInfo(projectData)} class="fas fa-info"></i>
            <i on:click={toggleChangeMode} class="fas fa-edit"></i>
            <i on:click={removeProject(projectID)} class="fas fa-trash-alt"></i>
        </div>
        <div class="project-info">
            {#if change}
                <div class="visible-info">
                    <p><span>Category:</span> {projectData.category}</p>        
                    <p><span>Location:</span> {projectData.location}</p>
                    <p><span>Starts:</span> {projectData.startDate}</p>
                    <p><span>Ends:</span> {projectData.endDate}</p>
                </div>
                {#if show}
                    <div class="hidden-info">
                        <p><span>Description:</span></p>
                        <p>{projectData.description}</p>
                    </div>
                {/if}
            {:else}
                <form on:submit|preventDefault={changeProjectInfo(projectID)}>
                    <div class="visible-info visible-info-change">
                        <p><span>Category:</span>
                            <select class="dark-background" id="category" bind:value={projectData.category} required>
                                <option>[choose from the list]</option>
                                {#await getCategoryData then categories}
                                    {#each categories as category}
                                        <option value={category.data().name}>{category.data().name}</option>
                                    {/each}
                                {/await}
                            </select>
                        </p>        
                        <p><span>Location:</span>
                            <select bind:value={projectData.location}>
                                <option>[choose from the list]</option>
                                {#await getCountryData then countries}
                                    {#each countries as country}
                                        <option value={country.data().name}>{country.data().name}</option>
                                    {/each}
                                {/await}
                            </select>   
                        </p>
                        <p><span>Starts:</span><input type="date" bind:value={projectData.startDate}></p>
                        <p><span>Ends:</span><input type="date" bind:value={projectData.endDate}></p>
                    </div>
                    <div class="hidden-info">
                        <p><span>Description:</span></p>
                        <p><input class="change-description" bind:value={projectData.description}></p>
                    </div>
                    <button>Save changes</button>
                </form>
            {/if}
        </div>
    </div>
</div>

<style>
    h2 {
        font-size: 2.5rem;
        letter-spacing: 1px;
        color: #47525E;
        text-transform: uppercase;
        min-width: 120px;
    }

    p   {
        font-size: 2rem;
        margin-bottom: 8px;
    }

    p span {
        color: #FF9052;
        margin-right: 5px;
    }

    .icons {
        user-select: none;
    }

    i {
        font-size: 3rem;
        padding: 15px;
        cursor: pointer;
    }

    .fa-info{
        color: darkgreen;
    }

    .fa-edit {
        color: rgb(190, 190, 0);
    }

    .fa-trash-alt {
        color: rgb(180, 0, 0)
    }

    .project-full {
        justify-content: space-between;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }

    .visible-info {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px 25px;
        letter-spacing: 0.5px;
    }

    @media (max-width: 670px) {
        .visible-info-change {
            grid-template-columns: 1fr  
        }
    }

    button {
        background-color: darkgreen;
        color: white;
        width: 20%;
        min-width: 80px;
        margin: 10px auto 0 auto;
        padding: 5px 5px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 1.5rem;
        outline: none;
        margin-bottom: 20px;
    }

    .change-description {
        width: 80%;
    }

    .hidden-info {
        margin-top: 10px;
    }

    .border-dotted {
        margin-bottom: 10px;
    }
</style>