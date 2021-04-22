package getIntVals

import (
	"SavvyK8s/k8api/model"
	"strconv"
)

func GetIntVals(PodResponseObject model.PodMetrics,NodeResponseObject model.NodeMetrics)(model.PodMetrics, model.NodeMetrics){

	for  i:=0;i<len(PodResponseObject.Pods);i++{
		j:=0
		for ;j<len(PodResponseObject.Pods[i].Containers);j++{
			k:=0
			for ;k<len(PodResponseObject.Pods[i].Containers[j].ContainerUsages);j++{
				PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].CpuInt,PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].MemoryInt = convertInt(PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].Cpu, PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].Memory)
			}
		}

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

	return cpuMetricsInt,memoryMetricsInt

}