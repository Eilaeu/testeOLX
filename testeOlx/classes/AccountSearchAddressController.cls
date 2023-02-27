public with sharing class AccountSearchAddressController {

    private static AccountSearchAddressService service;
    
    static {
        service = new AccountSearchAddressService();
    }

    @AuraEnabled
    public static ZipCodeAddress fetchAddress(String cep) {
       
        String apiUrl = 'https://viacep.com.br/ws/' + cep + '/json/';
    
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(apiUrl);
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            ZipCodeAddress result = (ZipCodeAddress)JSON.deserialize(response.getBody(), ZipCodeAddress.class);
            return result;
        } else {
            return null;
        }
    }

    @AuraEnabled
    public static string saveAccount(String contactId, String newEmail ) {
       System.debug('>>> '+newEmail);
        Contact con = [SELECT Id, Email FROM Contact WHERE Id = :contactId];
        con.Email = newEmail;
        update con;
       
        return 'sucesso';
    }

}