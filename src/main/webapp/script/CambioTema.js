alert("ciao");
function changeTheme(){
        const currentTheme = document.getElementById("theme").getAttribute("href").toString();
        if(currentTheme.includes("light")){
          document.getElementById("theme").setAttribute("href", "/styles/darkTheme.css")
        }
        else{
          document.getElementById("theme").setAttribute("href", "/styles/lightTheme.css")
        }
      }