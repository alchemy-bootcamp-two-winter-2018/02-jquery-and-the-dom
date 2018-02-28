'use strict';

const articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// To create the instance of the article. Name is capitalized because it is a construtor funciton. 'this' refers to the particular object you are currently constructing which is contained within the array of rawData. rawDataObj represents the information needed to create a new instance of Article that are stored in rawData.

function Article (rawDataObj) {
    Object.keys(rawDataObj).forEach(key => {
        this[key] = rawDataObj[key];
    });

    // TODONE: Use the object literal that is passed in to complete this constructor function
    // Save ALL the properties of `rawDataObj` into `this`
    // It is creating the key/value pairs for each instance of the array.
}

Article.prototype.toHtml = function() {
    // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
    // This is used to copy a template (not referenceing) for the articles to keep your code dry.

    const template = $('#article-template').clone().html();
    /* TODONE: We got the html from our template, but we need to turn the html string into a jQuery object and store it in our $newArticle variable. */
    const $newArticle = $(template);

    if (!this.publishedOn) $newArticle.addClass('draft');
    $newArticle.attr('data-js-category', this.category);
    $newArticle.find('.byline a').attr('href', this.authorUrl);
    $newArticle.find('address a').text(this.author);
    $newArticle.find('h1').text(this.title);
    $newArticle.find('.article-body').html(this.body);
    $newArticle.attr('datetime', this.publishedOn);


    /* TODONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

    // REVIEW: Display the date as a relative number of 'days ago'
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
    $newArticle.append('<hr>');
    return $newArticle;
};

rawData.sort(function(a,b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODONE: Refactor these for loops using the .forEach() array method.

rawData.forEach(function (rawDataObj) {
    articles.push(new Article(rawDataObj));
});

articles.forEach(function (articleObj) {
    $('#articles').append(articleObj.toHtml());
});

