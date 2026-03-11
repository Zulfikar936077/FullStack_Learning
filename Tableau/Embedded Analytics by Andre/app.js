console.log("I am a script");
let viz;
const containerDiv = document.getElementById("vizContainer");
const btn = document.getElementById("btn");
const showBtn = document.getElementById("showBtn");
const exportPDF = document.getElementById("exportPDF");
const exportImage = document.getElementById("exportImage");
const url = 'https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link';
const options = {
  hideTabs: true,
  height: 800,
  width: 1200,
  device: 'desktop',
  onFirstInteractive: function() {
    console.log('Hey, my dashboard is ready!');
  },
  onFirstVizSizeKnown: function() {
    console.log('The viz size is known!');
  }
  }
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options); //V should be in capital letter in Viz because it is a class
}

document.addEventListener('DOMContentLoaded', initViz);
btn.addEventListener('click' , function() {
  console.log('Button clicked!');
  viz.hide();
})
//listen for clicks to hide the viz
btn.addEventListener('click' , function() {
  console.log('Button clicked!');
  viz.hide();
})
//listen for clicks to show the viz
showBtn.addEventListener('click', function(){
  console.log('Show button clicked!');
  viz.show();
})
//listen for clicks to export the viz as a PDF
exportPDF.addEventListener('click', function(){
  console.log('Export PDF button clicked!');
  viz.showExportPDFDialog();
})
//listen for clicks to export the viz as an image
exportImage.addEventListener('click', function(){
  console.log('Export Image button clicked!');
  viz.showExportImageDialog();
})

//application of the filter to the viz
function getRangeValue(){
  //getting value from the input fields
  const minValue = document.getElementById('minValue').value;
  const maxValue = document.getElementById('maxValue').value;
  console.log(minValue, maxValue);
  //get the workbook object
  const workbook = viz.getWorkbook();
  //get the active sheet
  const activeSheet = workbook.getActiveSheet();
  //get all the active sheets
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1]; //index 1 is the sheet we want to filter
  sheetToFilter.applyRangeFilterAsync("Sales", {
    min: minValue,
    max: maxValue
  })
  //after async that return a Promise, we can use then and catch to handle the result
  .then(function() {
    console.log('Filter applied successfully!');
  })
  .catch(function(error) {
    console.log('Error applying filter:', error);
  });
}
document.getElementById('applyFilter').addEventListener('click', function(){
  getRangeValue();
}) 