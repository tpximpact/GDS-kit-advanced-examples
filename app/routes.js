//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


// For validating the personal details page in the comment flow
router.post('/camden/comment/comment-11-answers', function(request, response) {

  if (!request.session.data['name'] || !request.session.data['address'] || !request.session.data['postcode']){
    response.redirect("/camden/comment/comment-11-errors")
  } else {
    response.redirect("/camden/comment/check-answers")
  }
})

// For making the comment flow work
router.post('/camden/comment/comment-flow', function(request, response) {

  if (!request.session.data['topics']){
    response.redirect("/camden/comment/comment-02-errors")
  } 
  else {
    var i= request.session.data.questionNumber;
   
    // Get number of topics selected
    request.session.data.selectedQs = request.session.data['topics'].length;

    if (i < request.session.data.selectedQs) {
      request.session.data.questionName = request.session.data.topics[i];
      i++;
      request.session.data.questionNumber = i;
      response.redirect("/camden/comment/comments-logical");
    }
    else {
      request.session.data.questionNumber = 0;
      response.redirect("/camden/comment/comment-11");
    }
  }
})