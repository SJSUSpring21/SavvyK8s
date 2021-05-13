package checkThreshold

import (
	"SavvyK8s/k8api/mailAlert"
	"SavvyK8s/k8api/model"
)

func CheckThresholdPod(PodResponseObject model.PodMetrics){


	for i:=0;i<len(PodResponseObject.Pods);i++{

		if PodResponseObject.Pods[i].Cpu > 200{

			mailAlert.MailAlert("Pod",PodResponseObject.Pods[i].MetadataPods.Name,"cpu",PodResponseObject.Pods[i].Cpu)

		} else if PodResponseObject.Pods[i].Memory> 200 {

			mailAlert.MailAlert("Pod",PodResponseObject.Pods[i].MetadataPods.Name,"cpu",PodResponseObject.Pods[i].Memory)

		}
	}


}
