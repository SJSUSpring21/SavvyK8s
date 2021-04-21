package mongostore

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"k8api/model"
)

func MongoInsert(Client *mongo.Client,ctx context.Context,PodResponseObject model.PodMetrics, NodeResponseObject model.NodeMetrics) bool{





	return true
}
