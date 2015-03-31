describe('Document', function () {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Document, component;

  beforeEach(function () {
    Document = require('app/components/Document');
    component = TestUtils.renderIntoDocument(
      <Document title="Title" bodyClass="body-class">
        <h1>Body text</h1>
      </Document>
    );
  });

  it('should create a new instance of Document', function () {
    expect(component).toBeDefined();
  });

  it('has title are Title', function(){
    expect(document.title).toBe('Title');
  });

  it('has body class are body-class', function(){
    expect(document.body.className).toMatch("body-class");
  });

  it('has content are Body text', function(){
    var h1 = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    expect(h1.getDOMNode().textContent).toEqual('Body text');
  });
});