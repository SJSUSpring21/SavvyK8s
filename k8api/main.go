package main

import (
	"fmt"
	"k8api/getIntVals"
	"k8api/getNodes"
	"k8api/getPods"
	"k8api/k8Proxy"
	"k8api/model"
	"k8api/mongostore"
)

func main(){

	fmt.Println("savvy K8s running")
	k8Proxy.K8sProxy()

	//Add loop to run after specific time

	var PodResponseObject model.PodMetrics
	var NodeResponseObject model.NodeMetrics


	PodResponseObject = getPods.GetPods()
	NodeResponseObject = getNodes.GetNodes()
	PodResponseObject, NodeResponseObject = getIntVals.GetIntVals(PodResponseObject,NodeResponseObject)

	//store to mongo db
	mongostore.MongoStore(PodResponseObject, NodeResponseObject)
}
