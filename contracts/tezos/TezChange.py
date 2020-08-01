import smartpy as sp

pay_type = sp.TRecord(address=sp.TString, amount=sp.TMutez)

class TezChange(sp.Contract):
    def __init__(self, admin, fee):
        self.init(cadmin=admin,fees=fee, funds=sp.tez(0), transfers=sp.list(t=pay_type), lock=False)

    @sp.entry_point
    def pay_recipient(self, params):
        sp.verify(sp.sender==self.data.cadmin)
        sp.verify(self.data.funds>=sp.tez(params.amt))
        self.data.funds-=sp.tez(params.amt)
        sp.send(params.address, sp.tez(params.amt))
    
    @sp.entry_point
    def add_funds(self):
        sp.verify(sp.sender==self.data.cadmin)
        self.data.funds+=sp.amount
        
    @sp.entry_point
    def transfer_eth(self,params):
        sp.verify(~self.data.lock)
        sp.verify(sp.amount>sp.tez(self.data.fees))
        self.data.funds+=sp.amount
        self.data.transfers.push(sp.record(address=params.address,amount=(sp.amount-sp.tez(self.data.fees))))
        
    @sp.entry_point
    def lock_contract(self):
        sp.verify(sp.sender==self.data.cadmin)
        self.data.lock=True
    
    @sp.entry_point
    def complete_transfers(self):
        sp.verify(sp.sender==self.data.cadmin)
        sp.verify(self.data.lock)
        self.data.transfers=[]
        self.data.lock=False
        
    @sp.entry_point
    def drain(self):
        sp.verify(sp.sender==self.data.cadmin)
        self.data.funds=sp.tez(0)
        sp.send(self.data.cadmin, sp.balance)

       

@sp.add_test(name = "TezChange")
def test():
    scenario = sp.test_scenario()
    scenario.h1("TezChange")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    admin = sp.test_account("Admin")
    c1 = TezChange(admin=admin.address,fee=1)
    scenario += c1
    scenario += c1.add_funds().run(sender = admin,amount=sp.tez(30))
    scenario.verify(c1.balance==sp.tez(30))
    scenario += c1.pay_recipient(address=alice.address,amt=10).run(sender = alice,valid=False)
    scenario += c1.pay_recipient(address=alice.address,amt=10).run(sender = admin)
    scenario.verify(c1.balance==sp.tez(20))
    scenario +=c1.lock_contract().run(sender = alice,valid=False)
    scenario +=c1.lock_contract().run(sender = admin)
    scenario +=c1.transfer_eth(address="Ethdgdfgdfgdfg").run(sender=alice,amount=sp.tez(10), valid=False)
    scenario +=c1.complete_transfers().run(sender = admin)
    scenario +=c1.transfer_eth(address="Ethdgdfgdfgdfg").run(sender=alice,amount=sp.tez(10))
    scenario.verify(c1.balance==sp.tez(30))
    scenario.verify(c1.data.funds==sp.tez(30))
    