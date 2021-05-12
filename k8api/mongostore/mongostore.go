package mongostore

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"SavvyK8s/k8api/model"
	"log"
)

func MongoStore(PodResponseObject model.PodMetrics,NodeResponseObject model.NodeMetrics){
	uri:="mongodb+srv://admin:admin123@cluster0.lnxpp.mongodb.net/kubernetes-metrics?retryWrites=true&w=majority"
	client, ctx := MongoConnect(uri)

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)
	MongoInsert(client,ctx, PodResponseObject,NodeResponseObject)

	defer client.Disconnect(ctx)

}
