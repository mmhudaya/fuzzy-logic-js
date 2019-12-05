class Utils{
    constructor(){

    }


    readTextFromFile(fileInputDocId, callback){
        var fileInputEl = document.getElementById(fileInputDocId)
        console.log(fileInputEl.files)

        if(fileInputEl.files){
            var file = fileInputEl.files[0]
            var textType = "application/vnd.ms-excel" 
            
            if (file.type.match(textType)) {
                var reader = new FileReader();
                var stringText = ""
                
                reader.onload = function(e) {
                    var content = reader.result
                    callback(content)
                }
                
                reader.readAsText(file)
            } else {
                fileDisplayArea.innerText = "File not supported!"
            }
        }else{
            alert("Please select .txt files first")
        }
    }
}