package main

import (
	"fmt"
	"k8api/getIntVals"
	"k8api/getNodes"
	"k8api/getPods"
	"k8api/model"
)

func main(){

	fmt.Println("savvy K8s running")

	var PodResponseObject model.PodMetrics
	var NodeResponseObject model.NodeMetrics


	PodResponseObject = getPods.GetPods()
	NodeResponseObject = getNodes.GetNodes()

	PodResponseObject, NodeResponseObject = getIntVals.GetIntVals(PodResponseObject,NodeResponseObject)

	//store to mongo db
}
