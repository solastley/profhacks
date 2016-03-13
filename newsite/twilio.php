<?php
// this line loads the library 
require('./twilio-php-master/Services/Twilio.php'); 
 
$account_sid = 'AC8e9c16f7f897b3ef7f98a69eb6b589a5'; 
$auth_token = '7be55ba7d8bfacd7af093d71bca74705'; 
$client = new Services_Twilio($account_sid, $auth_token); 
 
$client->account->messages->create(array( 
	'To' => "+17242059954", 
	'From' => "+17245208120", 
	'Body' => "Hello, Nathan Todd has listed you as his emergency contact for MediRoute. He is currently experiencing a medical emergency and is on his way to the Kennedy University Hospital.",   
));
?>