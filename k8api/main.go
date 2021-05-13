package main

import (
	"SavvyK8s/k8api/checkThreshold"
	"SavvyK8s/k8api/getIntVals"
	"SavvyK8s/k8api/getNodes"
	"SavvyK8s/k8api/getPods"
	"SavvyK8s/k8api/k8Proxy"
	"SavvyK8s/k8api/model"
	"SavvyK8s/k8api/mongostore"
	"fmt"
	"time"
)

func main(){

	fmt.Println("savvy K8s running")
	k8Proxy.K8sProxy()


	for i:=0;i<200;i++{

		var PodResponseObject model.PodMetrics
		var NodeResponseObject model.NodeMetrics


		PodResponseObject = getPods.GetPods()
		NodeResponseObject = getNodes.GetNodes()
		PodResponseObject, NodeResponseObject = getIntVals.GetIntVals(PodResponseObject,NodeResponseObject)


		checkThreshold.CheckThresholdPod(PodResponseObject)
		checkThreshold.CheckThresholdNode(NodeResponseObject)

		mongostore.MongoStore(PodResponseObject, NodeResponseObject)
		time.Sleep(10 * time.Second)

	}
}
