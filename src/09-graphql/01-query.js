import React, { Component } from 'react'
import { ApolloProvider,ApolloClient,InMemoryCache  } from '@apollo/client'
import { Query} from '@apollo/client/react/components';
import gql from 'graphql-tag'


const client = new ApolloClient({
    uri: '/graphql', 
    cache: new InMemoryCache(),
  });

export default class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div>
                <KQuery></KQuery>
            </div>
        </ApolloProvider>
      
    )
  }
}

class KQuery extends React.Component {
    query=gql`
        query{
            getNowPlayingList{
            id,
            name,
            price
            }
        }
    `
    render(){
        return<Query query={this.query}>
            {
                ({data})=>{
                    console.log(data);
                    return <div>query</div>
                    // return loading?<div>loading...</div>:
                    // <div>
                    //     {
                    //         data.getNowPlayingList.map(item=>(
                    //             <div key={item.id}>
                    //                 <div>Name:{item.name}</div>
                    //                 <div>Price:{item.price}</div>
                    //             </div>
                    //         ))
                    //     }
                    // </div>
                }
            }
        </Query>
    }
}
