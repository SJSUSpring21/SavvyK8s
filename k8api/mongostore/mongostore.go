package mongostore

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"SavvyK8s/k8api/model"
	"log"
)

func MongoStore(PodResponseObject model.PodMetrics,NodeResponseObject model.NodeMetrics){
	uri:="mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb"
	client, ctx := MongoConnect(uri)



	//testing code. remove after testing
	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)

	MongoInsert(client,ctx, PodResponseObject,NodeResponseObject)
	//Add code to insert data to mongodb database
	//Add for nodes and for pods/containers

	defer client.Disconnect(ctx)

}
