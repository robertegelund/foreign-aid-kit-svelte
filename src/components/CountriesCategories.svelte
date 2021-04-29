<script>
    import {db} from "../firebase.js";
    import Projects from "./Projects.svelte";
    const countries = db.collection("countries");
    const categories = db.collection("categories");
  
    // Country example data
    const countriesArray = [
        {
            "id": "TZA",
            "name": "Tanzania",
            "sent": 0,
            "received": 0
        },
        {
            "id": "EGY",
            "name": "Egypt",
            "sent": 0,
            "received": 0
        }
    ]
    
    // Load country example data into database
    for(const country of countriesArray) {
        countries
            .doc(country.id)
            .set({
                id: country.id,
                name: country.name,
                sent: country.sent,
                received: country.received
        })
    }

    let countryArray = []
    const getCountryData = async () => {
        const getCountries = await countries.get()
        countryArray = await getCountries.docs
        return countryArray
    }
    
    // Category example data
    const categoryData = [
        {
            "name": "Economic Development and Trade",
            "description": ""
        },
        {
            "name": "Education",
            "description": ""
        },
        {
            "name": "Emergency Assistance",
            "description": ""
        }, 
        {
            "name": "Environment and Energy",
            "description": ""
        },
        {
            "name": "Good Governance",
            "description": ""
        },
        {
            "name": "Health and Social Services",
            "description": ""
        }
    ]

    // Load category example data into database
    for(const category of categoryData) {
        categories.add({
            name: category.name,
            description: category.description
        })
    }

    let categoryArray = []
    const getCategoryData = async () => {
        const getCategories = await categories.get()
        categoryArray = await getCategories.docs
        return categoryArray
    }
</script>

<Projects getCountryData={getCountryData()} getCategoryData={getCategoryData()}/>