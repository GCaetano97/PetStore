Deleted Copyright and ProTip components.

Started with the Header component. All the pages will have access to this and it'll be the main navigation tool.
A simple design just for testing porpuses and minimal stylling. 

Creating all the pages to have a base structure for the project

Started with login page. The page will be very simillar to the register one. 

Working on the homepage. Main component is the hero, basic image on background with a button hrefed to the store.

Register function made just to have the object prepared.

Login function made as well.

Store made with useContext because of the refresh

Login is wierd. Everyone can login without register but only registered persons can alter their data on settings. Like so, starting to work on the new header for the settings and logout buttons.

Register done, login done.

Header again to put the settings and logout function. useState is async so some problems after everything is working like intended. (Minor problem -> Memory leak <> suspect router.)

Starting settings. Settings has some problems with state and getting the data that the user already put in. Now all solved with useEffect. 


(refactor context para menos rerender)