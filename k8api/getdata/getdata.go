package getdata

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func Getdata(url string){

	fmt.Println("In Get data module")

	response , err :=http.Get(url)
	if err!=nil{
		fmt.Println(err.Error())
		os.Exit(1)
	}

	responseData , err := ioutil.ReadAll(response.Body)

	if err!=nil{
		log.Fatal(err)
	}

	fmt.Println(responseData)

	//var ResponseObject Obj
	//json.Unmarshal(responseData, &ResponseObject)
	//
	//
	//
	//for loop to decode and put
}