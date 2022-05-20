# Periodic Excersice API

![image](https://user-images.githubusercontent.com/62455934/169493079-a7052d34-aae3-4d06-bdc1-6c8c9e9de00c.png)

# Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16013993-ad78a1ed-216d-4e68-881b-d610a3b927df?action=collection%2Ffork&collection-url=entityId%3D16013993-ad78a1ed-216d-4e68-881b-d610a3b927df%26entityType%3Dcollection%26workspaceId%3Daa0bb4e2-e714-4968-bd39-d9d56f9c0f3d)
<br/>
<br/>

## Login
  ### To be able to make requests to the API you need to first log in, passing you're username in the body
  - #### HTTP Request
   `https://int0d29313.execute-api.us-east-1.amazonaws.com/prod/v1/login`
  - #### Body example
    ![image](https://user-images.githubusercontent.com/62455934/169497534-aed69481-3eb2-4cd9-80e6-fa8f3554fb9e.png)

   
  #### With the access token that is retrieved you should set a header in the following requests as:
   ![image](https://user-images.githubusercontent.com/62455934/169496716-679b28ca-37bf-4084-aba2-594806596c9e.png)

## Users
  ### Get All Users

  - #### HTTP Request
    `GET https://int0d29313.execute-api.us-east-1.amazonaws.com/prod/v1/users`
    
  ### Get Specific User
  
  - #### HTTP Request
    `GET https://int0d29313.execute-api.us-east-1.amazonaws.com/prod/v1/users/<userEmail>`
    
  - #### URL Parameters
  | Parameter | Description  |
  |----------|--------------|
  | userEmail        | email of the user to retrieve |
  
  ### Post user
  
  - #### HTTP Request
    `POST https://int0d29313.execute-api.us-east-1.amazonaws.com/prod/v1/users`
    
  - #### Body example
  ![image](https://user-images.githubusercontent.com/62455934/169500141-fdbd8b18-70d2-44c2-8a24-67488da6cf75.png)
  
  ### Delete user 
  
  - #### HTTP Request
  `DELETE https://int0d29313.execute-api.us-east-1.amazonaws.com/prod/v1/users/<userEmail>`
  
  - #### URL Parameters
  | Parameter | Description  |
  |----------|--------------|
  | userEmail        | email of the user to delete |
  
  ### Update user
  
  - #### HTTP Request
  `PATCH https://int0d29313.execute-api.us-east-1.amazonaws.com/prod/v1/users`
  
  - #### Body example
  ![image](https://user-images.githubusercontent.com/62455934/169502539-3a70837c-ddc3-45eb-bb61-b39f06800946.png)

  ### .CSV file of all users in the system
  
  - #### HTTP Request
  `GET https://int0d29313.execute-api.us-east-1.amazonaws.com/prod/v1/users/download`
  
  
  
    
  
  
  
    
 
  
 
