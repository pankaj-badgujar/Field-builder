class FormService{

    static myInstance = null;

    static getInstance() {
        if (FormService.myInstance == null) {
            FormService.myInstance =
                new FormService();
        }
        return this.myInstance;
    }

    postDataToAPI = (fieldJSON) =>
        fetch("http://www.mocky.io/v2/566061f21200008e3aabd919",{
            method : 'POST',
            body: JSON.stringify(fieldJSON),
            headers:{
                'content-type':'application/json'
            }

        }).then(response => {
            console.log(fieldJSON);
            return response.json()
        });

}

export default FormService;
