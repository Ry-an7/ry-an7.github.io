// Assignment 3 Visulizations

//Question 1
async function renderBar() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
        vl.x().fieldN("platform").title("Platform"),
        vl.y().fieldQ("global_sales").aggregate("sum").title("Global Sales (in millions of units)"),
        vl.color().fieldN("genre").title("Genre").scale({scheme : "category20"}),
        vl.tooltip().fieldQ("global_sales").aggregate("sum")
    )

    .width(1000)
    .height(600)
    .toSpec();

    vegaEmbed("#viewQ1", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 2 Genre
async function renderLineG() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markArea()
    .data(data)
    .encode(
        vl.x().fieldN("year").title("Year"),
        vl.y().fieldQ("global_sales").aggregate("sum").title("Total Sales"),
        vl.color().fieldN("genre").title("Genre").scale({scheme: "category20"}), 
        vl.tooltip().fieldN('genre')
    )
    .width(1000)
    .height(600)
    .toSpec();

    vegaEmbed("#viewQ2G", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 2 Platform
async function renderLineP() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markArea()
    .data(data)
    .encode(
        vl.x().fieldN("year").title("Year"),
        vl.y().fieldQ("global_sales").aggregate("sum").stack("center").title("Total Sales"),
        vl.color().fieldN("platform").title("Platform").scale({ range: [
            "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
            "#8c564b", "#e377c2", "#bcbd22", "#17becf", "#393b79",
            "#637939", "#e6550d", "#fdae6b", "#d6616b", "#756bb1",
            "#9c9ede", "#e7ba52", "#843c39", "#7b4173", "#1f78b4",
            "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#cab2d6",
            "#6a3d9a", "#b15928", "#ff9896", "#5c4d7d", "#a55194"
        ]}),
        vl.tooltip().fieldN('platform')
    )
    .width(1000)
    .height(600)
    .toSpec();

    vegaEmbed("#viewQ2P", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 3
async function renderBarRS() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markBar().width({step: 6.5})
    .data(data)
    .encode(
        vl.x().fieldN("platform").title("Platform"),
        vl.y().fieldQ("sales_amount").aggregate("sum").title("Sales Amount (in millions of units)"),
        vl.xOffset().field("sales_region"),
        vl.color().field("sales_region").title("Region"),
        vl.tooltip().fieldQ("sales_amount").aggregate("sum")
)
    .height(500)
    .toSpec();

    vegaEmbed("#viewQ3", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 4
async function renderArc() {
    const data = await d3.csv("./datasets/videogames_long.csv");
    const Xbox = data.filter((item)=>{return item.platform === "X360"});

    const vlSpec = vl
    .markArc()
    .data(Xbox)
    .encode(
        vl.theta().fieldQ("genre").aggregate("count"),
        vl.color().fieldN("genre").scale({scheme : "category20"}).title("Genres"), 
        vl.opacity().if(vl.selectSingle('genre_selection').fields(['genre']).bind('legend'), vl.value(1)).value(0.2),
        vl.tooltip().fieldN("genre").aggregate("count")
)
    .select(vl.selectSingle('genre_selection').fields(['genre']).bind('legend'))
    .height(500)
    .width(1000)
    .toSpec();

    vegaEmbed("#viewQ4", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

renderBar();
renderLineG();
renderLineP();
renderBarRS();
renderArc();
