package getIntVals

import (
	"k8api/model"
	"strconv"
)

func GetIntVals(PodResponseObject model.PodMetrics,NodeResponseObject model.NodeMetrics)(model.PodMetrics, model.NodeMetrics){
	i:=0
	j:=0
	k:=0
	for  i<len(PodResponseObject.Pods){

		for j<len(PodResponseObject.Pods[i].Containers){

			for k<len(PodResponseObject.Pods[i].Containers[j].ContainerUsages){
				PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].CpuInt,PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].MemoryInt = convertInt(PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].Cpu, PodResponseObject.Pods[i].Containers[j].ContainerUsages[k].Memory)
			}
		}

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
		}
	}

		cpuMetricsInt, _ := strconv.ParseInt(cpuMetrics,10,64)
	memoryMetricsInt,_ := strconv.ParseInt(memoryMetrics,10,64)

	return cpuMetricsInt,memoryMetricsInt

}