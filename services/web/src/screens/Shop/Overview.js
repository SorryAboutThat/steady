import React from 'react';
import { Header, Table, Image, Label } from 'semantic-ui-react';
import { urlForUpload } from 'utils/uploads';
import { formatDateTime } from 'utils/date';
import { screen } from 'helpers';

@screen
export default class ShopOverview extends React.Component {
  render() {
    const { shop } = this.props;
    return (
      <div>
        <Header as="h1">{shop.name}</Header>
        <p>{shop.description}</p>
        <Header as="h3">Images</Header>
        <Image.Group size="large">
          {shop.images.map((image) => (
            <Image key={image.id} src={urlForUpload(image)} />
          ))}
        </Image.Group>
        <Header as="h3">Details</Header>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Categories</Table.Cell>
              <Table.Cell>
                {shop.categories.map((category) => (
                  <Label key={category.id} content={category.name} />
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Created At</Table.Cell>
              <Table.Cell>{formatDateTime(shop.createdAt)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Updated At</Table.Cell>
              <Table.Cell>{formatDateTime(shop.updatedAt)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
