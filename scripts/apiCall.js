const apiCall = function() {
    const url = 'https://api.github.com/users/martinLuigiQuang/repos';
    let gitHubStartDates = [];
    const gitHubApiCall = async function() {
        try {
            const promise = await fetch(url);
            const response = await promise.json();
            const startDates = response.map((project) => new Date(project.created_at));
            const lastUpdates = response.map((project) => new Date(project.pushed_at));
            getDates(startDates);
        }
        catch (err) {
            console.log(err)
        }
    };

    gitHubApiCall();

    const getDates = function(asyncData) {
        gitHubStartDates = asyncData;
    }
    gitHubApiCall();
    console.log(gitHubStartDates)
    return {
        gitHubStartDates: gitHubStartDates
    }
}();

export default apiCall;