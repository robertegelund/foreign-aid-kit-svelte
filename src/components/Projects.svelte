<script>
    import ProjectForm from "./ProjectForm.svelte";
    import Project from "./Project.svelte";
    import {db} from "../firebase.js"
    export let getCountryData;
    export let getCategoryData;
    const projects = db.collection("projects"); 

    let menuItem = 1;

    let projectArray = [];

    projects.onSnapshot(snap => {
        projectArray = snap.docs
    })
</script>

<section>
    <header>
        <div class="logo">Foreign/<br>Aid/<br>Kit</div>
        <div class="menu">
            <div on:click={() => menuItem = 1} class={menuItem === 1 ? "green" : ""}>ADD PROJECT</div>
            <div on:click={() => menuItem = 2} class={menuItem === 2 ? "green show-projects" : "show-projects"}>SHOW PROJECTS</div>
        </div>
    </header>

    {#if menuItem === 1}
        <h1>Create a New Project</h1>
        <div class="new-project">
            <ProjectForm getCountryData={getCountryData} getCategoryData={getCategoryData}/>
        </div>
    {:else}
        <h1>Foreign Aid Projects</h1>
        <div class="projects">
            {#each projectArray as project}
                <Project projectID={project.id} projectData={project.data()} getCountryData={getCountryData} getCategoryData={getCategoryData}/>
            {/each}
        </div>
    {/if}
</section>
 
<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 2rem;
        margin-bottom: 60px;
    }

    .logo {
        font-family: 'Segoe UI Black', sans-serif;
        font-size: 1.8rem;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0;
        min-width: 80px;
        padding: 0 20px 0 0;
    }

    .menu{
        display: flex;
    }

    .menu div{
        padding: 0 20px;
        font-size: 2.2rem;
        user-select: none;
        cursor: pointer;
    }

    .show-projects{
        padding-right: 0 !important; 
    }

    h1 {
        margin-bottom: 40px;
        font-size: 3.5rem;
        letter-spacing: 1px;
    }

    section {
        height: 100vh;
        min-height: 812px;
        min-width: 375px;
        background-image: url("./images/bakgrunn.png");
        background-size: cover;
        background-position: center;
        font-size: 2.8rem;
        padding: 30px !important;
    }

    .green{
        color: green;
    }
</style>