<script>
	import Projects from "./components/Projects.svelte";
	import {getCountryData, getCategoryData} from "./utils/handle-data.js";
</script>

<Projects getCountryData={getCountryData()} getCategoryData={getCategoryData()}/>