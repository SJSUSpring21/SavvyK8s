package mongostore

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"SavvyK8s/k8api/model"
	"os"
	"time"
)

func MongoInsert(client *mongo.Client,ctx context.Context,PodResponseObject model.PodMetrics, NodeResponseObject model.NodeMetrics) bool{


	col := client.Database("kubernetes-metrics").Collection("custAppMetrics2")

	colPod := client.Database("kubernetes-metrics").Collection("custAppMetrics2")


	currentTime := time.Now()


	for i:=0; i<len(NodeResponseObject.Nodes);i++{

		if NodeResponseObject.Nodes[i].MetadataNodes.Name=="master"{

			_, insertErr := col.InsertOne(ctx,bson.D{


				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: NodeResponseObject.Nodes[i].NodeUsages.CpuInt},{Key: "memory", Value: NodeResponseObject.Nodes[i].NodeUsages.MemoryInt}}},
				{Key: "nodeMetrics", Value: true},
				{Key: "nodeId", Value: 1},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			}
		}
		if NodeResponseObject.Nodes[i].MetadataNodes.Name=="node2"{
			_, insertErr := col.InsertOne(ctx,bson.D{


				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: NodeResponseObject.Nodes[i].NodeUsages.CpuInt},{Key: "memory", Value: NodeResponseObject.Nodes[i].NodeUsages.MemoryInt}}},
				{Key: "nodeMetrics", Value: true},
				{Key: "nodeId", Value: 2},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			}
		}
		if NodeResponseObject.Nodes[i].MetadataNodes.Name=="node2"{
			_, insertErr := col.InsertOne(ctx,bson.D{


				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: NodeResponseObject.Nodes[i].NodeUsages.CpuInt},{Key: "memory", Value: NodeResponseObject.Nodes[i].NodeUsages.MemoryInt}}},
				{Key: "nodeMetrics", Value: true},
				{Key: "nodeId", Value: 3},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			}
		}

	}


	for i:=0; i<len(PodResponseObject.Pods);i++{


		if PodResponseObject.Pods[i].MetadataPods.Name == "demo-app1-pod1"{

			_, insertErr := colPod.InsertOne(ctx,bson.D{
				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: PodResponseObject.Pods[i].Cpu},{Key: "memory", Value: PodResponseObject.Pods[i].Memory }}},
				{Key: "appId", Value: 1},
				{Key: "podId", Value: 1},
				{Key: "nodeMetrics", Value:false},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			} else {
				fmt.Println("Added Node data to mongo")
			}

		}
		if PodResponseObject.Pods[i].MetadataPods.Name == "demo-app1-pod2"{

			_, insertErr := colPod.InsertOne(ctx,bson.D{
				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: PodResponseObject.Pods[i].Cpu},{Key: "memory", Value: PodResponseObject.Pods[i].Memory }}},
				{Key: "appId", Value: 1},
				{Key: "podId", Value: 2},
				{Key: "nodeMetrics", Value:false},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			} else {
				fmt.Println("Added Node data to mongo")
			}

		}
		if PodResponseObject.Pods[i].MetadataPods.Name == "demo-app1-pod3"{

			_, insertErr := colPod.InsertOne(ctx,bson.D{
				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: PodResponseObject.Pods[i].Cpu},{Key: "memory", Value: PodResponseObject.Pods[i].Memory }}},
				{Key: "appId", Value: 1},
				{Key: "podId", Value: 3},
				{Key: "nodeMetrics", Value:false},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			} else {
				fmt.Println("Added Node data to mongo")
			}

		}
		if PodResponseObject.Pods[i].MetadataPods.Name=="demo-app2-pod1"{

			_, insertErr := colPod.InsertOne(ctx,bson.D{
				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: PodResponseObject.Pods[i].Cpu},{Key: "memory", Value: PodResponseObject.Pods[i].Memory }}},
				{Key: "appId", Value: 2},
				{Key: "podId", Value: 1},
				{Key: "nodeMetrics", Value:false},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			} else {
				fmt.Println("Added Node data to mongo")
			}


		}
		if PodResponseObject.Pods[i].MetadataPods.Name=="demo-app2-pod2"{

			_, insertErr := colPod.InsertOne(ctx,bson.D{
				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: PodResponseObject.Pods[i].Cpu},{Key: "memory", Value: PodResponseObject.Pods[i].Memory }}},
				{Key: "appId", Value: 2},
				{Key: "podId", Value: 2},
				{Key: "nodeMetrics", Value:false},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			} else {
				fmt.Println("Added Node data to mongo")
			}


		}
		if PodResponseObject.Pods[i].MetadataPods.Name=="demo-app2-pod3"{

			_, insertErr := colPod.InsertOne(ctx,bson.D{
				{Key: "metrics", Value:bson.D{{Key: "cpu", Value: PodResponseObject.Pods[i].Cpu},{Key: "memory", Value: PodResponseObject.Pods[i].Memory }}},
				{Key: "appId", Value: 2},
				{Key: "podId", Value: 3},
				{Key: "nodeMetrics", Value:false},
				{Key: "createdBy", Value: "System"},
				{Key: "createdDate", Value: currentTime.String()},

			})
			if insertErr != nil {
				fmt.Println("InsertOne ERROR:", insertErr)
				os.Exit(1) // safely exit script on error
			} else {
				fmt.Println("Added Node data to mongo")
			}


		}


	}



	return true
}
