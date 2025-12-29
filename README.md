Current Functionality:
* popup should acc control everything. when turned on, it then turns on content scripting.
* when the user tries to open a blacklisted site, it is automatically closed (existing blacklisted sites remain open until they are reloaded)

To Do:
* block existing webpages without deleting them (somehow prevent users from accessing them)
    * exact implementation unsure, but this is known:
        * popup calls when toggled on.
        * service worker heeds call and implements existing webpage (needs access to block list).
        * dynamic content script (thus manifest must be changed).

First Step:
* allow modification of blacklist through popup
    * this will require changing from static content scripts to dynamic ones (increase in permissions)
    * integral to blocking existing webpages.