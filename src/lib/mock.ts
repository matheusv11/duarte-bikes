export const longText = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus diam metus, scelerisque et pretium non, laoreet et sem. Aenean vehicula ullamcorper elit, ac condimentum tellus bibendum nec. Nullam gravida vehicula sem. Aenean efficitur erat gravida diam condimentum, a consectetur massa egestas. In tincidunt malesuada leo at blandit. Donec non leo nunc. Cras tempus velit dolor, non hendrerit dui vestibulum vitae. Duis non eros lacus. Nunc augue diam, congue rhoncus hendrerit eget, vehicula sit amet diam. Integer ornare luctus pharetra. Etiam nibh ipsum, euismod in leo ut, pharetra hendrerit odio.

Sed mi ligula, auctor a fringilla vitae, porttitor a velit. Vivamus vulputate placerat purus ut eleifend. Integer feugiat purus ut augue convallis, euismod hendrerit ipsum sodales. Nam varius vehicula sapien. Proin viverra elementum risus, vel venenatis odio hendrerit sed. Fusce ultrices non ipsum sed dignissim. Duis placerat sem vel enim scelerisque efficitur. Ut ullamcorper porttitor pellentesque. Nulla porttitor felis vel mi laoreet, quis porttitor erat elementum. Phasellus tincidunt nisi euismod orci luctus malesuada. Pellentesque interdum, elit at facilisis consequat, nunc felis rhoncus eros, sit amet dictum massa quam ut nunc. Mauris ultrices quam at sodales maximus. Duis posuere hendrerit libero in fringilla. Ut est est, semper sit amet nisi ut, malesuada fringilla ex. Nulla nec mollis augue, sit amet scelerisque libero. Praesent accumsan aliquam felis.

Etiam ac lorem a sapien mollis vestibulum. Vestibulum velit magna, posuere quis nisi vel, venenatis volutpat nibh. Ut sed facilisis leo. Curabitur ut ante id metus eleifend pulvinar. Donec feugiat sem eget augue dignissim, a vulputate ipsum pulvinar. Sed eleifend justo a justo mollis mollis. Sed consequat dui sed imperdiet dictum.

Suspendisse eu lorem tincidunt, sagittis nulla eget, sollicitudin quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas venenatis posuere sem, sed rhoncus mi porta eget. Donec facilisis pharetra tortor, vel pharetra quam. Suspendisse ac molestie purus. Nulla lacus elit, semper sed faucibus at, molestie eget nibh. Quisque ultrices condimentum libero, et porta lectus egestas quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris aliquam varius odio. Vestibulum at sem ac augue hendrerit congue ac nec mi. Sed a posuere metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Morbi et malesuada neque, sed consequat risus. Sed sed malesuada turpis. Morbi non ante mauris. Etiam consequat purus tortor, eu tincidunt tortor consequat feugiat. Nulla facilisi. Sed fermentum, diam vitae condimentum varius, arcu arcu facilisis mauris, nec vehicula sem magna a elit. Donec ornare velit sed sapien laoreet pretium. Sed tempus pharetra ante, id consectetur dolor fermentum eu. Vestibulum ultricies in ipsum eu pulvinar. `


export const largeSelledProductsData = [...Array(150).keys()].map(i => {

  return {
    "id": i,
    "custom_sold_value": 241,
    "quantity": 124,
    "createdAt": "22/03/2024 20:17:05",
    "updatedAt": "22/03/2024 20:17:05",
    "productId": "clu1wrayc0002x26j1vmbpc2x",
    "product": {
      "name": "Zero 1",
      "sold_value": 241
    },
    "edit": {
      "product": {
        "label": "Zero 1",
        "id": "clu1wrayc0002x26j1vmbpc2x"
      },
      "date": "2024-03-22T23:17:05.181Z",
      "quantity": 124,
      "sold_value": 241
    },
    "delete": {
      "id": i,
      "name": "Zero 1"
    },
    "product_name": "Zero 1",
    "product_value": 241,
    "sold_value": 241
  }
})
// export const largeSelledProductsData = [
//   {
//     "id": "clu3a4ddt000011gth2saxpmu",
//     "custom_sold_value": 421,
//     "quantity": 2,
//     "createdAt": "22/03/2024 20:15:14",
//     "updatedAt": "22/03/2024 20:15:14",
//     "productId": null,
//     "product": null,
//     "edit": {
//       "product": {
//         "id": null
//       },
//       "date": "2024-03-22T23:15:14.587Z",
//       "quantity": 2,
//       "sold_value": 421
//     },
//     "delete": {
//       "id": "clu3a4ddt000011gth2saxpmu"
//     },
//     "sold_value": 421
//   },
//   {
//     "id": "clu3a59dt000111gtu85fm5sz",
//     "custom_sold_value": 42,
//     "quantity": 2,
//     "createdAt": "22/03/2024 20:15:56",
//     "updatedAt": "22/03/2024 20:15:56",
//     "productId": null,
//     "product": null,
//     "edit": {
//       "product": {
//         "id": null
//       },
//       "date": "2024-03-22T23:15:56.057Z",
//       "quantity": 2,
//       "sold_value": 42
//     },
//     "delete": {
//       "id": "clu3a59dt000111gtu85fm5sz"
//     },
//     "sold_value": 42
//   },
//   {
//     "id": "clu3a6ql8000311gtfpiq5c6i",
//     "custom_sold_value": 241,
//     "quantity": 124,
//     "createdAt": "22/03/2024 20:17:05",
//     "updatedAt": "22/03/2024 20:17:05",
//     "productId": "clu1wrayc0002x26j1vmbpc2x",
//     "product": {
//       "name": "Zero 1",
//       "sold_value": 241
//     },
//     "edit": {
//       "product": {
//         "label": "Zero 1",
//         "id": "clu1wrayc0002x26j1vmbpc2x"
//       },
//       "date": "2024-03-22T23:17:05.181Z",
//       "quantity": 124,
//       "sold_value": 241
//     },
//     "delete": {
//       "id": "clu3a6ql8000311gtfpiq5c6i",
//       "name": "Zero 1"
//     },
//     "product_name": "Zero 1",
//     "product_value": 241,
//     "sold_value": 241
//   }
// ]