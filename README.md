Current Functionality:
* popup controls activation/deactivation of extension.
* when the user tries to open a blacklisted site, it is automatically closed (existing blacklisted sites remain open until they are reloaded).

To Do:
* block existing webpages without deleting them (somehow prevent users from accessing them)
    * exact implementation unsure, but this is known:
        * popup calls when toggled on.
        * service worker heeds call and implements existing webpage (needs access to block list).
        * redirect to block page, store old url.