async function InfluencerValidator(url) {
    try {
        const res = await fetch(url, {
            method: "GET",
        });
        const data = await res.status;
        if (data == 200) {
            return true;
        } else {
            return false;
        }
    } catch(error) {
        console.log(error);
        }

}

export default InfluencerValidator;