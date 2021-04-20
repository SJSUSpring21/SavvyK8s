package main

import (
	"fmt"
	"k8api/getdata"
)

func main(){

	fmt.Println("savvy kubernetes get data api running")
	url:="www.google.com"
	getdata.Getdata(url)


}
