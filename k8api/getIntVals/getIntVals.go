package getIntVals

import (
	"SavvyK8s/k8api/model"
	"fmt"
	"strconv"
)

func GetIntVals(PodResponseObject model.PodMetrics,NodeResponseObject model.NodeMetrics)(model.PodMetrics, model.NodeMetrics){

	fmt.Println("In get Int func")
	var TotalPodCpu int64
	var TotalPodMem int64


	for i:=0;i<len(PodResponseObject.Pods);i++{
		TotalPodMem = 0
		TotalPodCpu = 0
		for j:=0;j<len(PodResponseObject.Pods[i].Containers);j++{

			PodResponseObject.Pods[i].Containers[j].ContainerUsages.CpuInt, PodResponseObject.Pods[i].Containers[j].ContainerUsages.MemoryInt = convertInt(PodResponseObject.Pods[i].Containers[j].ContainerUsages.Cpu, PodResponseObject.Pods[i].Containers[j].ContainerUsages.Memory)
			TotalPodCpu = TotalPodCpu + PodResponseObject.Pods[i].Containers[j].ContainerUsages.CpuInt
			TotalPodMem = TotalPodMem + PodResponseObject.Pods[i].Containers[j].ContainerUsages.MemoryInt

		}

		PodResponseObject.Pods[i].Cpu=TotalPodCpu
		PodResponseObject.Pods[i].Memory=TotalPodMem


	}
	for i:=0;i<len(NodeResponseObject.Nodes);i++{
		NodeResponseObject.Nodes[i].NodeUsages.CpuInt,NodeResponseObject.Nodes[i].NodeUsages.MemoryInt=convertInt(NodeResponseObject.Nodes[i].NodeUsages.Cpu,NodeResponseObject.Nodes[i].NodeUsages.Memory)
	}


	return PodResponseObject,NodeResponseObject
}


func convertInt(cpuMetrics string, memoryMetrics string) (int64,int64){
	if last := len(cpuMetrics) - 1; last >= 0 && cpuMetrics[last] == 'n' {
		cpuMetrics = cpuMetrics[:last]
	}

	if last := len(memoryMetrics) - 1; last >= 0 && memoryMetrics[last] == 'i' {
		memoryMetrics = memoryMetrics[:last]

		if last := len(memoryMetrics) - 1; last >= 0 && memoryMetrics[last] == 'K' {
			memoryMetrics = memoryMetrics[:last]
		}else if last := len(memoryMetrics) - 1; last >= 0 && memoryMetrics[last] == 'M' {
			memoryMetrics = memoryMetrics[:last]
		}else if last := len(memoryMetrics) - 1; last >= 0 && memoryMetrics[last] == 'G' {
			memoryMetrics = memoryMetrics[:last]
		}
	}

	cpuMetricsInt, _ := strconv.ParseInt(cpuMetrics,10,64)
	memoryMetricsInt,_ := strconv.ParseInt(memoryMetrics,10,64)

	return cpuMetricsInt/1000000,(memoryMetricsInt/1024)

}