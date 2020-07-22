'use strict';

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let user = $("#username").val()
    getUserRepo(user)
  });
}

function getUserRepo(user) {
  fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson, user))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson, user){
  let repoLength = responseJson.length

  //clears the results 
  $(".results").html('');

  //loop through responseJson and for each, display repo name and repo url and then add the result to the results section
  for (let i=0; i<responseJson.length; i++){
    //console.log('Repo Name:',responseJson[i].name);
    //console.log('Repo URL:',responseJson[i].html_url)
    $('.results').append(
      `<div class='repo-url'><h2>Repo Name: ${responseJson[i].name}</h2>
      <li><a href="${responseJson[i].url}">Link to Repo</a></li></div>
      `
    )};
  //display the results section  
  $('.results').removeClass('hidden');
  displayUser(user, repoLength);
}

function displayUser(user, repoLength){
  //console.log(repoLength);
  $('.js-insert').text(`${user}`);
  $('.js-number').text(`${repoLength}`)
  $('.js-user').removeClass('hidden');
  $("#username").val('');
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});