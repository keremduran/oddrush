# ODDRUSH

This is a project I made when I was working as a table games dealer in Casino Woodbine, and I was looking for a training application to practice the mental math for payouts specifically designed for dealers, which I was not able to find, and I thought I should give it a shot. It could get quite difficult and stressful to mentally calculate payouts such $45 times 7, $135 times 1.5, in a real setting, while handling hundreds/thousands of dollars, within seconds.  

Code needs a lot of refactoring, some tests, but it's still one of my proud works, since it has helped me and a some of my colleagues to improve their accuracy and speed on the table. The game might not make a lot of sense to non-dealers, since I exactly replicated the casino rules from the view of a dealer, which takes multiple months of training to get used to; in terms of how the chips are broken down, how the order of denominations are placed on the tray, and how the odds are calculated.


## Stack

- [Nuxt.js](https://nuxtjs.org/) - A Vue framework with SSR and SSG capabilities.
- CSS
- Bootstrap

## Project structure

```
$PROJECT_ROOT
│   # Contains only the index.js file, which is the home page
├── pages
│   # Nuxt component files
├── components
│   # Vuex Store files to manage application state
├── store
│   # Static files for images and icons
└── static
```

## License

MIT License.

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org). Made by Kerem Duran, its open source so feel free to contribute or copy.

