"use strict"
const Promise = require('bluebird')
const expect = require('chai').expect
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const Browser = require('zombie')
const eventually = require('./lib/eventually')
const childProcess = require('child_process')

const app = require('../server')

const waitUntilListening = (subProcess) => 
  new Promise((fulfill, reject) => {
    subProcess.stdout.on('data', fulfill)
    subProcess.on('err', reject)
    subProcess.on('exit', (code) => 
      code === 0 ? fulfill() : reject(new Error(`Process returned ${code}`)))
  })

describe("e2e", function() {
  const browser = new Browser()
  const PORT_NUMBER = 5364
  let subProcess
  
  const runTodoServer = () => {
    subProcess = childProcess.fork(path.join(__dirname, '../server'), [], {
      env: Object.assign({}, process.env, {
        PORT: PORT_NUMBER
      }),
      silent: true
    })
    return waitUntilListening(subProcess)
  }
  const killTodoServer = () => subProcess.kill() 
  
  before(() => runTodoServer())
  after(() => killTodoServer())

  it("adds a todo correctly", () =>
    browser.visit(`http://localhost:${PORT_NUMBER}/`)
      .then(() => {
        browser.assert.success()
        browser.fill(".new-todo", "ggg")
        pressEnter(browser, ".new-todo")
        return eventually(() => {
          expect(browser.text('.todo-list li:nth-child(1) label')).to.equal('ggg')
          expect(browser.text('.todo-list li:nth-child(2) label')).to.equal('')
        })        
      })
  )
  
  it("deletes a todo correctly", () =>
    browser.visit(`http://localhost:${PORT_NUMBER}/`)
      .then(() => {
        browser.assert.success()
        browser.fill(".new-todo", "ggg")
        pressEnter(browser, ".new-todo")
        return eventually(() => {
          expect(browser.text('.todo-list li:nth-child(1) label')).to.equal('ggg')
        })
      })
      .then(() => {
        browser.pressButton(".todo-list li:nth-child(1) button.destroy")    
        return eventually(() => {
          expect(browser.text('.todo-list li:nth-child(1) label')).to.equal('')
        })
      })
  )
  
  it("marks a todo correctly", () =>
    browser.visit(`http://localhost:${PORT_NUMBER}/`)
      .then(() => {
        browser.assert.success()
        browser.fill(".new-todo", "ggg")
        pressEnter(browser, ".new-todo")
        return eventually(() => {
          expect(browser.text('.todo-list li:nth-child(1) label')).to.equal('ggg')
        })
      })
      .then(() => {
        browser.check(".todo-list li:nth-child(1) input.toggle")    
        return eventually(() => {
          expect(
            browser.field('.todo-list li:nth-child(1) input.toggle').checked).
              to.equal(true)
        })
      })
  )
})

function pressEnter(browser, selector) {
  const event = browser.document.createEvent('HTMLEvents');
  event.initEvent('keydown', true, true);
  event.keyCode = 13
  browser.dispatchEvent(selector, event)
}