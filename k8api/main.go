package main

import (
	"fmt"
	"k8api/getNodes"
	"k8api/getPods"
)

func main(){

	fmt.Println("savvy K8s running")
	
	getPods.GetPods()
	getNodes.GetNodes()

}
