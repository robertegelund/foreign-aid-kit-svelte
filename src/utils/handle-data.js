import {countryData, categoryData} from "../data/example-data.js";
import {db} from "../firebase.js";

const countries = db.collection("countries");
const categories = db.collection("categories");

// Push country example data to database
for(const country of countryData) {
    countries
        .doc(country.id)
        .set({
            id: country.id,
            name: country.name,
            sent: country.sent,
            received: country.received
    })
}

// Push category example data to database
for(const category of categoryData) {
    categories.add({
        name: category.name,
        description: category.description
    })
}

// Load country example data from database
let countryArray = []
export const getCountryData = async () => {
    const getCountries = await countries.get()
    countryArray = await getCountries.docs
    return countryArray
}

// Load category example data from database
let categoryArray = []
export const getCategoryData = async () => {
    const getCategories = await categories.get()
    categoryArray = await getCategories.docs
    return categoryArray
}