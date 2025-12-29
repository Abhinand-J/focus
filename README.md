Current Functionality:
* popup should acc control everything. when turned on, it then turns on content scripting.
* when the user tries to open a blacklisted site, it is automatically closed (existing blacklisted sites remain open until they are reloaded)

To Do:
* block existing webpages without deleting them (somehow prevent users from accessing them)
    * have to either 
* allow modification of blacklist through popup
    * this will require changing from static content scripts to dynamic ones (increase in permissions)
    * think this is less useful anyways so will set aside as a non-integral feature.