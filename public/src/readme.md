# AngularJS Structure and Foundation
[Reference Structure](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)

## Directory Example

+ `app/`
 	+ `shared/`   # acts as reusable components or partials of our site
		+ `sidebar/`
			+ `sidebarDirective.js`
			+ `sidebarView.html`
		+ `article/`
			+ `articleDirective.js`
			+ `articleView.html`
 	+ `components/`   # each component is treated as a mini Angular app
		+ `home/`
			+ `homeController.js`
			+ `homeService.js`
			+ `homeView.html`
		+ `blog/`
			+ `blogController.js`
			+ `blogService.js`
			+ `blogView.html`
 	+ `app.module.js`
 	+ `app.routes.js`
+ `assets/`
 	+ `img/`      # Images and icons for your app
 	+ `css/`      # All styles and style related files (SCSS or LESS files)
 	+ `js/`       # JavaScript files written for your app that are not for angular
 	+ `libs/`     # Third-party libraries such as jQuery, Moment, Underscore, etc.
+ `index.html`

## INDEX.HTML

The index.html lives at the root of front-end structure. The index.html file will primarily handle loading in all the libraries and Angular elements.

## ASSETS FOLDER

The assets folder is also pretty standard. It will contain all the assets needed for your app that are not related your AngularJS code. There are many great ways to organize this directory but they are out of scope for this article. The example above is good enough for most apps.

## APP FOLDER

This is where the meat of your AngularJS app will live. We have two subfolders in here and a couple JavaScript files at the root of the folder. The app.module.js file will handle the setup of your app, load in AngularJS dependencies and so on. The app.route.js file will handle all the routes and the route configuration. After that we have two subfolders – components and shared. Let’s dive into those next.

## COMPONENTS FOLDER

The components folder will contain the actual sections for your Angular app. These will be the static views ,directives and services for that specific section of the site (think an admin users section, gallery creation section, etc). Each page should have it’s own subfolder with it’s own controller, services, and HTML files.

Each component here will resemble a mini-MVC application by having a view, controller and potentially services file(s). If the component has multiple related views, it may be a good idea to further separate these files into ‘views’, ‘controllers’, ‘services’ subfolders.

This can be seen as the simpler folder structure shown earlier in this article, just broken down into sections. So you could essentially think of this as multiple mini Angular applications inside of your giant Angular application.

## SHARED FOLDER

The shared folder will contain the individual features that your app will have. These features will ideally be directives that you will want to reuse on multiple pages.

Features such as article posts, user comments, sliders, and others should be crafted as AngularJS Directives. Each component here should have it’s own subfolder that contains the directive JavaScript file and the template HTML file.

In some instances, a directive may have it’s own services JavaScript file, and in the case that it does it should also go into this subfolder.