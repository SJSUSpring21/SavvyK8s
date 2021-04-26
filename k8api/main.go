package main

import (
	"SavvyK8s/k8api/getIntVals"
	"SavvyK8s/k8api/getNodes"
	"SavvyK8s/k8api/getPods"
	"SavvyK8s/k8api/k8Proxy"
	"SavvyK8s/k8api/model"
	"fmt"
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

	fmt.Println("-------------------------------------------------")
	fmt.Println(PodResponseObject)
	fmt.Println("")
	fmt.Println("")
	fmt.Println(NodeResponseObject)
	fmt.Println("-------------------------------------------------")

	//checkThreshold.CheckThresholdPod(PodResponseObject)
	//checkThreshold.CheckThresholdNode(NodeResponseObject)


	//mongostore.MongoStore(PodResponseObject, NodeResponseObject)
}
