import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

// export default () => {
//     return <h1>This is the capaign list page!!!</h1>
// };

class CampaignIndex extends Component{
    //static defines a class variable 
    //not a variable for eache instance.
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        return { campaigns };
    }
    renderCampaigns() {
        const items = this.props.campaigns.map((address) => {
          return {
            header: address,
            description: (
              <Link route={`/campaigns/${address}`}>
                <a>View Campaign</a>
              </Link>
            ),
            fluid: true,
          };
        });
        return <Card.Group items={items} />;
    }

    render(){
        return (
            <Layout>
              <div>
                <h3>Open Campaigns</h3>
                <Link route="/campaigns/new">
                  <a>
                    <Button
                      floated="right"
                      content="Create Campaign"
                      icon="add circle"
                      primary
                    />
                  </a>
                </Link>
                {this.renderCampaigns()}
              </div>
            </Layout>
        );
    }
}

export default CampaignIndex;