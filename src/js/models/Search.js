// https://www.food2fork.com/api/search
// cc233808cd06a3937fbf472dd4288635

import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
      
    }

    async getResults() {

        const key = 'cc233808cd06a3937fbf472dd4288635';
    
        try {

        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes
        //console.log(this.result);

        } catch (error) {
            alert(error);
        }
        
    }
}
