import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getApiData from '@salesforce/apex/AccountSearchAddressController.fetchAddress';
import updateContact from '@salesforce/apex/AccountSearchAddressController.saveAccount';

export default class MyComponent extends LightningElement {
    apiResult = false;
    email='sbrubles@teste.com';
    cep;
    @api recordId;

    handleAccountNameChange(event) {
        this.cep = event.target.value;
    }

    consultaCEP() {
        console.log(this.cep);

        getApiData({cep:this.cep})
        .then(result => {
            this.apiResult = result;
            this.showToast('Success', 'Consulta bem sucedida', 'success');
        })
        .catch(error => {
            console.error(error);
            this.showToast('Error', error.body.message, 'error');
        });

    }

    atualizaSobject(){
        updateContact({ 
            contactId: this.recordId, 
            newEmail: this.email 
        })
        .then(() => {
            this.showToast('Success', 'Sobject atualizado', 'success');
        })
        .catch(error => {
            console.error(error);
            this.showToast('Error', error.body.message, 'error');
        })
        .finally(() => {
            this.isLoading = false;
        });
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }


}