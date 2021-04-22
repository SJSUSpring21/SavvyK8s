package checkThreshold

import (
	"SavvyK8s/k8api/mailAlert"
	"SavvyK8s/k8api/model"
)

func CheckThresholdPod(PodResponseObject model.PodMetrics){


	for i:=0;i<len(PodResponseObject.Pods);i++{

		for j:=0;j<len(PodResponseObject.Pods[i].Containers);j++{

			for k:=0;k<len(PodResponseObject.Pods[i].Containers[j].ContainerUsages);k++{

				if PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].CpuInt > 1000{

					mailAlert.MailAlert("Pod",PodResponseObject.Pods[i].MetadataPods.Name,"cpu",PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].CpuInt )

				} else if PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].MemoryInt > 1000 {

					mailAlert.MailAlert("Pod",PodResponseObject.Pods[i].MetadataPods.Name,"cpu",PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].MemoryInt )

				}


			}
		}

	}


}
