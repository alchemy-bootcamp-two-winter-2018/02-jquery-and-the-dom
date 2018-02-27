'use strict';

const articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// See line 14, the name is capitalized because it's a constructor function, rawDataObj is the parameter passed into the constructor function.


function Article (rawDataObj) {
    Object.keys(rawDataObj).forEach(key => {
        this[key] = rawDataObj[key];
    });

    // TODONE: Use the object literal that is passed in to complete this constructor function
    // Object.keys is getting the keys from the object and looping for each key in the object and setting each key from the given object and saving it to Article as a property
    // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function() {
    // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
    // Instead of just copying the first element it also copies all of its decendents

    const template = $('#article-template').clone().html();
    /* TODONE: We got the html from our template, but we need to turn the html string into a jQuery object and store it in our $newArticle variable. */
    const $newArticle = $(template);

    if (!this.publishedOn) $newArticle.addClass('draft');
    $newArticle.find('h1').text(this.title);
    $newArticle.attr('data-js-category', this.category);
    $newArticle.find('a').text(this.author);
    $newArticle.find('a').attr('href', this.authorUrl);
    $newArticle.attr('datetime', this.publishedOn);
    $newArticle.find('.article-body').html(this.body);

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

// for(let i = 0; i < rawData.length; i++) {
//     articles.push(new Article(rawData[i]));
// }

rawData.forEach(function (rawData) {
    articles.push(new Article(rawData));
});


// for(let i = 0; i < articles.length; i++) {
//     $('#articles').append(articles[i].toHtml());
// }

articles.forEach(function (articles) {
    $('#articles').append(articles.toHtml());
});